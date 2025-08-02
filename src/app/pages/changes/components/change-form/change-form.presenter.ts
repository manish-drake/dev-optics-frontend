import { Component, OnInit } from '@angular/core';
import { ChangeFormComponent } from "./change-form.component";
import { CategoryEnum, ChangeModel } from '../../../../services/model-interface/interfaces';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModelService } from '../../../../services/model-services/model.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../environment/environment';
import { incrementVersion } from '../../../../helper/auto-increment-version';

@Component({
  selector: 'app-change-form-presenter',
  standalone: true,
  imports: [ChangeFormComponent],
  template: `<app-change-form [form]="form" [app]="appName" [imageUrl]='imageUrl' (file)="onImageFile($event)"
   [editMode]="isEditMode" (formSubmit)="submit()" [category]="categoryList"></app-change-form>`,
  styleUrl: './change-form.component.scss'
})
export class ChangeFormPresenter implements OnInit {

  imageUrl: string | null = null;
  categorySelected: boolean = false;
  isUpdateMode: boolean = false;

  categoryList: string[] = [];
  appName: string[] = [];
  public form!: FormGroup;
  public changeId: number | null = null;
  public isEditMode = false;

  constructor(private modelService: ModelService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.categoryList = Object.values(CategoryEnum);
    this.buildForm();

    this.route.params.subscribe((params) => {
      this.changeId = params['id'];
      this.isEditMode = !!this.changeId;
      if (this.isEditMode && this.changeId) {
        this.modelService.getSingleChange(this.changeId).subscribe({
          next: (data) => {
            this.form.patchValue(data);
            this.imageUrl = data.image_url;
          },
          error: (err) => console.log('Single data get error:', err)
        })
      }
    })

    this.modelService.getAppNames().subscribe({
      next: (data) => {
        this.appName = data;
      }
    })


    // Check if we are in edit mode
    this.route.params.subscribe((params) => {
      this.changeId = params['id'];
      this.isEditMode = !!this.changeId;

      if (this.isEditMode && this.changeId) {
        this.modelService.getSingleChange(this.changeId).subscribe({
          next: (data) => {
            this.form.patchValue(data);
            this.imageUrl = data.image_url;

            // Don't lock category during update
            this.form.get('category')?.enable();
          },
          error: (err) => console.log('Single data get error:', err)
        });
      } else {
        // Only in create mode, lock category after selection
        this.form.get('category')?.valueChanges.subscribe((selectedCategory) => {
          if (!this.categorySelected && selectedCategory) {
            this.categorySelected = true;
            // this.form.get('category')?.disable();

            const currentVersion = this.form.get('version')?.value || '0.0.0';
            const newVersion = incrementVersion(currentVersion, selectedCategory);
            this.form.get('version')?.setValue(newVersion);
          }
        });
      }
    });

  }
  private buildForm(): void {
    this.form = this.fb.group({
      id: [''],
      app: [''],
      version: [''],
      dtt_change: [''],
      change_title: [''],
      change_desc: [''],
      category: [''],
      dev: [''],
      image_url: ['']
    })
  }

  onImageFile(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.modelService.imageUpload(file).subscribe({
        next: (response) => {
          console.log('Upload successful:', response);
          const fullUrl = `${environment.apiUrl}${response.url}`
          this.imageUrl = fullUrl // assign returned URL to preview it
          this.form.get('image_url')?.setValue(fullUrl);
        },
        error: (err) => {
          console.error('Upload failed:', err);
        },
      });
    }
  }

  submit() {
    if (this.form.invalid) return;
    const changeData: ChangeModel = this.form.value;

    if (this.isEditMode) {
      this.modelService.updateChange(changeData.id, changeData).subscribe({
        next: () => {
          console.log('Update successfully')
          this.router.navigate(['/change']);
        },
        error: (err) => console.log('Update Error:', err)
      })
    } else {
      this.modelService.createChange(changeData).subscribe({
        next: () => {
          console.log('Created successfully');
          this.form.reset();
          this.router.navigate(['/change'])
        }
      })
    }
  }

}

import { Data, Views } from "../model-service/payroll-interface";

export class FilterBuilder {
    m_filters: Data.Filter[] = []
    empty(): boolean {
        return this.m_filters.length <= 0;
    }

    addMany(filter: Views.FilterMany) {
        let filters: Data.Filter[];
        filter.values.forEach(val => filters.push({ operand1: filter.field, opearnd2: val, operator: 0 }));
        this.m_filters.push(...filters)
    }
    addOne(filter: Views.FilterOne) {
        if (filter.outValue) {
            let f: Data.Filter = { operand1: filter.field, opearnd2: filter.outValue, operator: 0 };
            this.m_filters.push(f);
        }
    }
    addSmaller(filter: Views.FilterSmaller) {
        if (filter.outValue) {
            let f: Data.Filter = { operand1: filter.field, opearnd2: filter.outValue, operator: 1 };
            this.m_filters.push(f);
        }
    }
    addLarger(filter: Views.FilterLarger) {
        if (filter.outValue) {
            let f: Data.Filter = { operand1: filter.field, opearnd2: filter.outValue, operator: 2 };
            this.m_filters.push(f);
        }
    }
    addSmallerIncluding(filter: Views.FilterSmaller) {
        if (filter.outValue) {
            let f: Data.Filter = { operand1: filter.field, opearnd2: filter.outValue, operator: 3 };
            this.m_filters.push(f);
        }
    }
    addLargerIncluding(filter: Views.FilterLarger) {
        if (filter.outValue) {
            let f: Data.Filter = { operand1: filter.field, opearnd2: filter.outValue, operator: 4 };
            this.m_filters.push(f);
        }
    }
    numberToSign(n: number): string {
        switch (n) {
            case 1://filter smaller
                return ">";
            case 2://filter larger
                return "<";
            case 3://filter smaller
                return ">=";
            case 4://filter larger
                return "<=";
            case 0:
            default:
                return "=";
        }
    }
    toString(): string {
        const strFilters: string[] = this.m_filters.map((filter: Data.Filter) => {
            let strFilter: string[] = [filter.operand1, filter.opearnd2];
            return strFilter.join(this.numberToSign(filter.operator));
        })
        return strFilters.join("&");
    }
}
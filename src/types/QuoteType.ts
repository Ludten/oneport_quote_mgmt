interface SectionData {
    _id: string;
    basis: string;
    unit_of_measurement: string;
    unit: number;
    rate: number;
    amount: number;
}

interface SectionCurrency {
    currency: string;
    exchange_rate: number;
    is_base_currency: boolean;
    customer_currency: string;
}

interface Section {
    _id: string;
    section_name: string;
    section_number: number;
    section_data: SectionData[];
    section_currency: SectionCurrency;
}

interface QuoteType {
    _id: string;
    quote_date: string;
    sections: Section[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    quote_title: string;
}

interface NewQuoteType extends Omit<QuoteType, '_id' | 'createdAt' | 'updatedAt' | '__v'> {}

export type { 
    SectionData,
    SectionCurrency,
    Section,
    QuoteType,
    NewQuoteType
}

export interface Meta {
    total: number;
    limit: number;
}

export interface Category {
    specialisation: string;
}

export interface Requirement {
    education: string;
    experience: number;
}

export interface Addresses {
    address: Address[];
}

export interface Address {
    location: string;
    lng: string;
    lat: string;
}

export interface ContactList {
    contact_type: string;
    contact_value: string;
}

export interface Results {
    vacancies: Vacancy[];
}

export interface Vacancy {
    vacancy: {
        id: string;
        source: string;
        region: Region;
        company: Company;
        "creation-date": string;
        salary: string;
        salary_min: number;
        salary_max: number;
        "job-name": string;
        vac_url: string;
        employment: string;
        schedule: string;
        duty: string;
        category: Category;
        requirement: Requirement;
        addresses: Addresses;
        social_protected: string;
        contact_list: ContactList[];
        contact_person: string;
        work_places: number;
        currency: string;
        term?: {
            text: string;
        };
    };
}

export interface Region {
    region_code: string;
    name: string;
}

export interface Company {
    companycode: string;
    "hr-agency": boolean;
    inn: string;
    kpp: string;
    name: string;
    ogrn: string;
    site: string;
    url: string;
}

export interface ResponseData {
    status: string;
    meta: Meta;
    results: Results;
}

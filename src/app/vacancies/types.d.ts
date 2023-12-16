interface Params {
    params: {
        jobCategory: string;
    };
    searchParams?: { text?: string };
}

interface CategoryVacancy {
    name: string;
    jobCategory: string;
    icon: JSX.Element;
    title: string;
}

interface Meta {
    total: number;
    limit: number;
}

interface Category {
    specialisation: string;
}

interface Requirement {
    education: string;
    experience: number;
    qualification?: string;
}

interface Addresses {
    address: Address[];
}

interface Address {
    location: string;
    lng: string;
    lat: string;
}

interface ContactList {
    contact_type: string;
    contact_value: string;
}

interface Results {
    vacancies: Vacancy[];
}

interface Vacancy {
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

interface Region {
    region_code: string;
    name: string;
}

interface Company {
    companycode: string;
    "hr-agency": boolean;
    inn: string;
    kpp: string;
    name: string;
    ogrn: string;
    site: string;
    url: string;
}

interface ResponseData {
    status: string;
    meta: Meta;
    results: Results; // | {};
}
interface ResponseVacancy {
    status: string;
    meta: Meta;
    results: Results;
}
// type ResultsEmptyObj = Record<Results, {}>;

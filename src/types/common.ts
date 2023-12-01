export interface IMeta {
    limit: number;
    page: number;
    size: number;
    total: number;
}

export interface ResponseSuccessType {
    data: any;
    meta?: IMeta
}


export interface IGenericErrorMessage {
    path: string | number;
    message: string;
};



export interface IGenericErrorResponse {
    statusCode: number;
    message: string;
    errorMessages: IGenericErrorMessage[];
}

export interface IAttributeGroup {
    id: string,
    group_name: string,
    created_at: string,
    updated_at: string,
}

export interface IAttributeOption {

    id: string,
    option_text: string,
    attribute_id: string,
    is_deleted: null,
    created_at: string,
    updated_at: string

}

export interface IAttribute {
    id: string,
    attribute_name: string,
    attribute_code: string,
    type: string,
    is_required: boolean,
    display_on_frontend: boolean,
    is_filterable: boolean,
    sort_order: number,
    created_at: string,
    updated_at: string,
    attribute_group_id: string,
    attribute_options: [
        IAttributeOption
    ]
}

interface IImage {
    id: string;
    image_url: string;
    category_id: string;
    product_id: string | null;
    isDeleted: boolean | null;
    created_at: string;
    updated_at: string;
}

interface IMetaSEO {
    id: string;
    parent_id: string;
    meta_title: string;
    meta_description: string;
    url_key: string;
    created_at: string;
    updated_at: string;
}

export interface ICategory {
    id: string;
    name: string;
    description: string;
    status: boolean;
    include_in_nav: boolean;
    parent_id: number;
    position: number;
    meta_SEO_id: string;
    created_at: string;
    updated_at: string;
    images: IImage[];
    Meta_SEO: IMetaSEO;
}


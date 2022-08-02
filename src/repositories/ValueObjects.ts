export type JsonType =
    | string
    | number
    | boolean
    | { [x: string]: JsonType }
    | Array<JsonType>;

export type DynamicType = {
 [tag: string] : {
                    representation: {
                                    [key:string]: any
                                  },
                    value: string
                 }
}



type ErrorMessage = {
    message?: any,
    error?: string,
    statusCode?: number
}

export type Response<T> = Partial<T & ErrorMessage>;

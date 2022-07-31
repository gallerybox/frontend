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

export interface Setting {
  id?: number,
  name?: string,
  value?:string
}

export interface Banner {
  id?: number,
  name?: string,
  description?: string,
  file_path?: string,
  type?: string,
  sort_order?: number,
  video?: any
}


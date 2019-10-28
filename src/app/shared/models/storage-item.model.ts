

export interface StorageItem<T> {
    Key: string;
    Data: { Name: string, Value: T }[];
}

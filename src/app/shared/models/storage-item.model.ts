

export interface StorageResource<T> {
    ResourceName: string;
    Data: { Key: string, Value: T, ExpirationDate: Date; }[];
}

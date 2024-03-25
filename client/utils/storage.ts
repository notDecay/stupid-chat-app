//#use duck_ast debug
interface ICreateStorageOptions {
  storage: Storage
}

export function createStorage<Data extends {}>(options: ICreateStorageOptions) {
  const { storage } = options
  
  // todo: fix "as string" thing :v
  return {
    get<Key extends keyof Data>(key: Key): Data[Key] {
      const data = storage.getItem(key as string)
      if (!data) {
        console.error(`[createStorage] data does not exist`)
      }
      
      return JSON.parse(data!)
    },
    set<Key extends keyof Data>(key: Key, value: Data[Key]) {
      storage.setItem(
        key as string, 
        JSON.stringify(value)
      )
    }
  }
}

export type CreateStorage<Data extends {}> = ReturnType<typeof createStorage<Data>>
import { safeParse, number, parse, pipe, transform,unknown } from "valibot";
import axios from "axios";
import { DraftProductSchema, ProductsSchema, type Product, ProductSchema } from "../types"
import {toBoolean} from '../utils'


type ProductData ={
    [k: string]: FormDataEntryValue;
}

export async function addProduct(data : ProductData) {
   try{
        const result = safeParse(DraftProductSchema,{
            name: data.name,
            price: +data.price
        })
         if(result.success){
            const url=`${import.meta.env.VITE_API_URL}/api/products`
            await axios.post(url, {
                name: result.output.name,
                price: result.output.price
            })
         } else{
            throw new Error('Datos no válidos')
         }
   }catch(error){
        console.log(error)
   }
}

export async function getProducts(){
    try{
        const url=`${import.meta.env.VITE_API_URL}/api/products`
        const { data } = await axios.get(url)
        //   console.log(data.data)
        const result = safeParse(ProductsSchema, data.data)
        // console.log(result)
        if(result.success){
            return result.output
        }else{
            throw new Error('Hubo un error...')
        }
    }catch(error){
        console.log(error)
    }
}

export async function getProductById(id : Product['id']){
    try{
        const url=`${import.meta.env.VITE_API_URL}/api/products/${id}`
        const { data } = await axios.get(url)
        // console.log(data.data)
        const result = safeParse(ProductSchema, data.data)
        // console.log(result)
        if(result.success){
            return result.output
        }else{
            throw new Error('Hubo un error...')
        }
    }catch(error){
        console.log(error)
    }
}

export async function updateProduct(data : ProductData, id: Product['id']) {
    try {
        const NumberSchema = pipe(
        unknown(),          // acepta cualquier cosa
        transform(Number),  // convierte
        number()            // valida el resultado
        );

        // const NumberSchema = pipe(transform(Number), number()); ////Funciona números, strings y con fechas

        const result = safeParse(ProductSchema, {
            id,
            name: data.name,
            price: parse(NumberSchema,data.price), //+data.price,
            availability: toBoolean(data.availability.toString())
        })

        if(result.success){
            const url=`${import.meta.env.VITE_API_URL}/api/products/${id}`
            await axios.put(url,result.output)
        }

    } catch (error) {
        console.log(error)
    }
}

export async function deleteProduct(id : Product['id']){
    try{
        const url=`${import.meta.env.VITE_API_URL}/api/products/${id}`
         await axios.delete(url)
    }catch(error){
        console.log(error)
    }
}

export async function updateProductAvailability(id : Product['id']){
    try{
        const url=`${import.meta.env.VITE_API_URL}/api/products/${id}`
         await axios.patch(url)
    }catch(error){
        console.log(error)
    }
}
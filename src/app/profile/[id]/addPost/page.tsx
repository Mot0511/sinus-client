"use client"

import React, { useRef, useState } from 'react'
import cl from './style.module.sass'

const Component = () => {

    const fileRef = useRef(null)
    const [images, setImages] = useState<string[]>([])

    const loadImg = () => {
        const file = fileRef.current?.files.item(0)
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setImages([...images, String(reader.result)])
        }
        
    }

        

    return (
        <div>
            <div className="block">
                <h2 className="heading">Публикация поста</h2>
                <textarea name="" id="" placeholder='Описание поста' required></textarea>
                <div className={cl.images+' flex'}>
                        {
                            images && images.map(img => <img src={img} />)
                        }
                </div>
                <label className="input-file">
                    <input type="file" name="file[]" onChange={loadImg} ref={fileRef} accept="image/*" hidden/>		
                    <span className='blueButton'>Загрузить картинку</span>
 		        </label>
                <br />
                <button className='greenButton' style={{marginTop: '40px'}}>Опубликовать</button>
            </div>
        </div>
    )
}
export default Component
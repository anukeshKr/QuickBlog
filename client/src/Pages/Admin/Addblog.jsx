import React, { useEffect, useRef, useState } from 'react'
import {assets, blogCategories} from '../../assets/assets'
import Quill from 'quill';
import { useAppContext } from '../../context/Appcontext';
import toast from 'react-hot-toast';
import {parse} from 'marked'

const Addblog = () => {

  const{axios,fetchblogs} = useAppContext();
  const[isAdding,setIsAdding]= useState(false)
  const[loading,setLoading]= useState(false)


  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const[image,setImage] = useState(false);
  const[title,setTitle] = useState('');
  const[subTitle,setSubTitle] = useState('');
  const[category,setCategory] = useState('Startup');
  const[isPublished,setIsPublished] = useState(false);

  const onsubmitHandler = async(e)=>{
    try {
      e.preventDefault();
      setIsAdding(true);


      const blog = {
        title,subTitle,
        description:quillRef.current.root.innerHTML,
        category,isPublished
      }

      const formData = new FormData()
      formData.append('image',image)
      formData.append('blog',JSON.stringify(blog))

      const {data} = await axios.post('/api/blog/add',formData);

      if (data.success) {
        toast.success(data.message)
        setImage(false)
        setTitle('')
        quillRef.current.root.innerHTML=''
        setCategory('Startup')

        fetchblogs()
      }else{
        toast.error(data.message)
      }
      
    } catch (error) {
      toast.error(error.message)
    }finally{
      setIsAdding(false)
    }
  }

  const generateContent = async()=>{
    if(!title) return toast.error('Please enter title')
    
    try {
      setLoading(true)
      const {data} = await axios.post('/api/blog/generate',{prompt:title})
      if (data.success) {
        quillRef.current.root.innerHTML= parse(data.content)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }finally{
      setLoading(false)
    }

  }

  useEffect(()=>{
    if(!quillRef.current && editorRef.current){
      quillRef.current = new Quill(editorRef.current,{theme:'snow'})
    }
  },[])

  return (
    <form onSubmit={onsubmitHandler} className='flex-1 bg-blue-50/50 text-gray-600 h-full'>
      <div className='bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded'>
        <p>Upload Thumbnail</p>
        <label htmlFor="image">
          <img src={!image?assets.upload_area:URL.createObjectURL(image)} alt="" className='mt-2 h-16 rounded cursor-pointer'/>
          <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' className='' hidden required/>
        </label>

        <p className='mt-4'>Blog Title</p>
        <input value={title} onChange={(e)=>setTitle(e.target.value)} type="text" placeholder='Type here' required className='w-full outline-none border max-w-lg mt-2 p-2 border-gray-300 rounded'/>

        <p className='mt-4'>Sub Title</p>
        <input value={subTitle} onChange={(e)=>setSubTitle(e.target.value)} type="text" placeholder='Type here' required className='w-full outline-none border max-w-lg mt-2 p-2 border-gray-300 rounded'/>

        <p className='mt-4'>Blog Description</p>
        <div className='max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative'>
            <div ref={editorRef}></div>
            {loading && (<div className='absolute right-0 top-0 bottom-0 left-0 flex items-center justify-center bg-black/10 mt-2'>
              <div className='w-8 h-8 rounded-full border-2 border-t-white animate-spin'></div>

            </div>)}
            <button disabled={loading} type='button' onClick={generateContent} className='absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer'>Generate with AI</button>
        </div>
        <p className='mt-4'>Blog Category</p>
        <select onChange={(e)=>{setCategory(e.target.value)}} name="category" className='mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded'>
          <option value="">Select Category</option>
          {blogCategories.map((item,idx)=>{
            return <option key={idx} value={item}>{item}</option>
          })}
        </select>
        <div className='flex gap-2 mt-4'>
          <p className=''>Published Now</p>
          <input type="checkbox" checked={isPublished} className='scale-125 cursor-pointer' onChange={(e)=>{setIsPublished(e.target.checked)}}/>
        </div>
        <button disabled={isAdding} type='submit' className='px-5 py-1.5 bg-primary border outline-none text-white mt-4 rounded'>{isAdding?'Adding...':'Add Blog'}</button>
      </div>
    </form>
  )
}

export default Addblog
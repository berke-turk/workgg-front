'use client';

import { FormEvent } from 'react';

import Colors from "@/lib/styles/colors";
import Size from "@/lib/styles/size";
import Pages from "@/lib/pages";
import Icons from '@/lib/icons';
import Images from '@/lib/images';
import PaperDataI from '@/lib/data-interfaces/paper';
import Status from '@/lib/data-interfaces/status';

// Redux
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/lib/redux/store'
import { setActive } from '@/lib/redux/features/fetchLoadingSlice'
//

export default function Form() {
    const fetchLoadingState = useSelector((state: RootState) => state.fetchLoading)
    const dispatch = useDispatch();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();  // Sayfanın yeniden yüklenmesini engeller
        try {
            dispatch(setActive(true)); // Loading State Start

            // POST API


            //
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="h-auto p-0 w-full flex flex-col justify-start items-center sm:flex-row sm:flex sm:items-start">
            <form onSubmit={handleSubmit} className="w-full flex flex-col sm:flex-wrap sm:max-w-[600px]">
                <div className="mb-5 sm:mr-5 w-full sm:min-w-96 flex flex-col justify-start items-center sm:flex-row sm:flex sm:items-start">
                    <div className="ml-0 mb-5 w-full sm:mb-0 sm:max-w-60 sm:mr-5">
                        <img className="h-64 mx-auto" src={'/images/' + Images.ataturk} alt="image description" />
                    </div>
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Kapak görseli için tıkla ve değiştir</span> </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                        </div>
                        <input disabled={fetchLoadingState.isActive} id="dropzone-file" type="file" onChange={() => { }} className="hidden" />
                    </label>
                </div>
                <div className="mb-5 sm:mr-5">
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Başlık</label>
                    <input disabled={fetchLoadingState.isActive} type="text" id="title" onChange={() => { }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                </div>
                <div className="mb-5 sm:mr-5">
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Açıklama</label>
                    <textarea disabled={fetchLoadingState.isActive} id="description" onChange={() => { }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                </div>
                <div className="mb-5 sm:mr-5">
                    <label htmlFor="keywords" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Anahtar Sözcükler</label>
                    <textarea disabled={fetchLoadingState.isActive} id="keywords" onChange={() => { }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                </div>
                <div className="mb-5 sm:mr-5">
                    <label htmlFor="volume-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cilt</label>
                    <input disabled={fetchLoadingState.isActive} type="number" onChange={() => { }} id="volume-input" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="90210" required />
                </div>
                <div className="mb-5 sm:mr-5">
                    <label htmlFor="subvolume-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sayı</label>
                    <input disabled={fetchLoadingState.isActive} type="number" onChange={() => { }} id="subvolume-input" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="90210" required />
                </div>
                <div className="w-full flex-col items-start mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Dergi Dosyası</label>
                    <input disabled={fetchLoadingState.isActive} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file" />
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">PDF (MAX. 100MB).</p>
                </div>

                <div className="w-full flex-col items-start mb-5">
                    <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Durum</label>
                    <select disabled={fetchLoadingState.isActive} id="countries" defaultValue={Status.active} onChange={() => { }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value={Status.active}>Aktif</option>
                        <option value={Status.passive}>Pasif</option>
                    </select>
                </div>
                <div className='mt-5'>
                    <span>
                        Dosyayı değiştirmek istediğinizde, mevcut dergiyi silip yeniden yüklemeniz gerekecek.
                    </span>
                </div>
                <div className='mt-5 flex items-center justify-start'>
                    {fetchLoadingState.isActive == false && (
                        <button type="submit" className={
                            `${fetchLoadingState.isActive ? `hidden` : ``}text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`
                        }>Ekle</button>
                    )}
                    {fetchLoadingState.isActive == true && (
                        <button disabled type="button" className="py-2.5 w-full px-5 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center justify-center">
                            <svg aria-hidden="false" role="status" className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
                            </svg>
                            Loading...
                        </button>
                    )}
                </div>
            </form>
        </div>
    )
}

export function PostData(id?: string | null): void {

    // Post API
    //
}
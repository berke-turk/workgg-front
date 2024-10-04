'use client';

import Colors from "@/lib/styles/colors";
import Size from "@/lib/styles/size";
import Pages from "@/lib/pages";
import Icons from '@/lib/icons';
import Images from '@/lib/images';
import PaperDataI from '@/lib/data-interfaces/paper';
import Status from '@/lib/data-interfaces/status';

import Icon from '@/components/icons/icon';
import Table, { TableDataI, TableSchemaI } from '@/components/table/component';

export default function Form() {
    return (
        <div className="h-auto p-0 w-full flex flex-col justify-start items-center sm:flex-row sm:flex sm:items-start">
            <form className="w-full flex flex-col sm:flex-wrap sm:max-w-[600px]">
                <div className="mb-5 sm:mr-5 w-full sm:min-w-96 flex flex-col justify-start items-center sm:flex-row sm:flex sm:items-start">
                    <div className="ml-0 mb-5 w-full sm:mb-0 sm:max-w-60 sm:mr-5">
                        <img className="h-64 mx-auto" src={'/images/'+Images.ataturk} alt="image description" />
                    </div>
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Kapak görseli için tıkla ve değiştir</span> </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                        </div>
                        <input id="dropzone-file" type="file" onChange={() => { }} className="hidden" />
                    </label>
                </div>
                <div className="mb-5 sm:mr-5">
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Başlık</label>
                    <input type="text" id="title" onChange={() => { }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                </div>
                <div className="mb-5 sm:mr-5">
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Açıklama</label>
                    <textarea id="description" onChange={() => { }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                </div>
                <div className="mb-5 sm:mr-5">
                    <label htmlFor="keywords" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Anahtar Sözcükler</label>
                    <textarea id="keywords" onChange={() => { }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                </div>
                <div className="mb-5 sm:mr-5">
                    <label htmlFor="volume-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cilt</label>
                    <input type="number" onChange={() => { }} id="volume-input" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="90210" required />
                </div>
                <div className="mb-5 sm:mr-5">
                    <label htmlFor="subvolume-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sayı</label>
                    <input type="number" onChange={() => { }} id="subvolume-input" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="90210" required />
                </div>
                <div className="w-full flex-col items-start mb-5">
                    <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Durum</label>
                    <select id="countries" defaultValue={Status.active} onChange={() => { }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
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
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Ekle</button>
                </div>
            </form>

        </div>
    )
}

export function PostData(id?: string | null): PaperDataI | null {
    if (id == null)
        return null;

    // Fetch API

    //
    let re: PaperDataI = { id: id, status: 'passive', title: "Test Başlığı", description: "Test açıklaması", read_count: "10", seo: "test-basligi", image: "", volume: "1", sub_volume: "2" };

    return re;
}
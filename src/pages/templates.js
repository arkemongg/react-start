import { useEffect } from 'react';

export const Title = (title)=>{
    useEffect(()=>{
      document.title = title
    },[])
}
//80% hr
export const hrStyle = {
  backgroundColor:"white",
  width:"80%",
  margin:"auto",
  height:"1px"
};

export const Card = (props) => {
    return (
      <li className="max-w-sm bg-white border border-gray-200 rounded-lg shadow product">
        <div>
          <div className="product-img-area">
          <img className="rounded-t-lg product-img" src={"http://127.0.0.1:8000"+props.img} alt="" />
          </div>
        </div>
        <div className="seller-details-area text-center text-white flex justify-between">
            <p className="verified-area iline-block bg-blue-700 p-1 grow m-1 rounded">
                  verified seller
            </p>
            <p className="super-area iline-block bg-blue-700 p-1 grow m-1 rounded">
                  Super seller
            </p>
        </div>
        <div className="p-5">
          <div className="product-title-area">
          <h5 className="mb-2 font-bold tracking-tight text-gray-900">{props.title}</h5>
          </div>
          <div className="buy-now flex justify-center">
            <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
              2000$
              <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
              </svg>
            </a>
          </div>
        </div>
      </li>
    )
  }

export const LoadingCard = (props)=>{
  return (
      <li className="max-w-sm bg-white border border-gray-200 rounded-lg shadow product flex items-center justify-center">
        <span className="loading loading-ring loading-lg bg-info"></span>
      </li>
  )

}
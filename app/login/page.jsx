const page = () => {
  return (
    <div className='bg-fundo-borda bg-contain bg-no-repeat bg-cor-principal text-black min-h-[600px]'>
      <div className=" w-9/12 p-3 m-auto md:w-9/12 md:p-[1px] ">
        <div className="flex justify-center space-x-[20px] md:space-x-[100px] mt-10">
          <img src='/images/sign_icon.png' className="w-1/3 max-w-[150px]" />
          <img src='/images/cert_icon.png' className="w-1/3 max-w-[150px]" />
          <img src='/images/secure_icon.png' className="w-1/3 max-w-[150px]" />
        </div>
      </div>

      <div className="m-auto w-[350px] pt-10">
        <div className="flex">
          <img src='/images/fire_fogo.png' className="w-[25px] align-middle" />
          <span className="align-middle m-2 text-lg font-bold">Assinatura digital</span>
        </div>
        <div className="flex mt-3 ml-8">
          <img src='/images/fire_fogo.png' className="w-[25px] align-middle" />
          <span className="align-middle m-2 text-lg font-bold">Certidões Fiscais</span>
        </div>
        <div className="flex  mt-3 ml-16">
          <img src='/images/fire_fogo.png' className="w-[25px] align-middle" />
          <span className="align-middle m-2 text-lg font-bold">Certificação de Documento</span>
        </div>
      </div>
     
    </div>
  )
}

export default page
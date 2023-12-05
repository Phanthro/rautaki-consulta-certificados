import { NextResponse } from 'next/server'

// const origin = 'http://avaloncliente-clusterip-srv/v1'
const origin = `http://localhost:5198/v1`
// const origin = `https://localhost:7150/v1`


export const config = {
  matcher: ['/((?!api|_next/static|images|favicon.ico).*)',]
}

export default async function middleware(request) {
  
  console.log('Destino: ' + request.nextUrl.pathname)
  
  if(request.nextUrl.pathname =='/logout' || request.nextUrl.pathname =='/'){
    return NextResponse.next();
  }

  if(request.nextUrl.pathname == '/deslogar'){
    const res = NextResponse.redirect(new URL('/', request.url));
    res.headers.set("logado", "false")
    res.headers.set("permissoes", "[]")
    res.cookies.delete('serpro-token');
    return res;
  }
  
  const token = request.cookies.get('serpro-token')
  
  if(!token) {
    console.log('token não encontrado')
    
    return NextResponse.next();
  }
  
  
  if(request.nextUrl.pathname == '/deslogar'){
    const res = NextResponse.redirect(new URL('/', request.url));
    res.headers.set("logado", "false")
    res.headers.set("permissoes", "[]")
    res.cookies.delete('serpro-token');
    return res;
  }
  
  
  if(request.nextUrl.pathname =='/login') {
    console.log('Acessando pagina de login mas com acesso')
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  return NextResponse.next({
    headers: {
      token: token.value
    }
  });

}
 


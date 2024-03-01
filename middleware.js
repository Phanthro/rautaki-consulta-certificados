import { NextResponse } from 'next/server'

export const config = {
  matcher: ['/((?!api|_next/static|images|favicon.ico).*)',]
}

export default async function middleware(request) {
  
  console.log('Destino: ' + request.nextUrl.pathname)
  
  if(request.nextUrl.pathname =='/logout'){
    return NextResponse.next();
  }

  if(request.nextUrl.pathname == '/deslogar'){
    const res = NextResponse.redirect(new URL('/', request.url));
    res.headers.set("logado", "false")
    res.headers.set("permissoes", "[]")
    res.cookies.delete('Fire-token');
    return res;
  }
  
  const token = request.cookies.get('Fire-token')
  
  if(!token) {
    if(request.nextUrl.pathname =='/login') {
      console.log('Acessando pagina de login mas com acesso')
      return NextResponse.next();
    }
    console.log('token não encontrado')
    const res = NextResponse.redirect(new URL('/login', request.url));
    return res;
  }
  
  
  if(request.nextUrl.pathname == '/deslogar'){
    const res = NextResponse.redirect(new URL('/', request.url));
    res.headers.set("logado", "false")
    res.headers.set("permissoes", "[]")
    res.cookies.delete('Fire-token');
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
 


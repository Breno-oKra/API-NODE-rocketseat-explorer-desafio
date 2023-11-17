module.exports = {
  //bail:true se um tester falhar ele para de executar os testes
  // se o bail estiver false, mesmo um teste dando erro ele continua executando os outros
  bail:true,
  coverageProvider:"v8",
  //colocando os arquivos que serão monitorados

  testMatch:[
    // **/ dentro de qualquer pagina, *.js qualquer nome com extenção js
    //como existe a pasta nodemodules e não queremos que o jest perca o tempo olhando ela
    // colocamos o jest para olha direto na pasta que queremos
    // <rootDir> significa a raiz do projeto
    "<rootDir>/src/**/*.spec.js"
  ]

}
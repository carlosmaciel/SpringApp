# Desenvolvedor

- Carlos Maciel da Silva
- Email: carlosmacie@gmail.com

# Objetivo do sistema

No cooperativismo, cada associado possui um voto e as decisões são tomadas em assembleias, por votação. Imagine que você deve criar uma solução para dispositivos móveis para gerenciar e participar dessas sessões de votação. 

Essa solução deve promover as seguintes funcionalidades através de uma API REST:

- Cadastrar uma nova pauta
- Abrir uma sessão de votação em uma pauta (a sessão de votação deve ficar aberta por um tempo determinado na chamada de abertura ou 1 minuto por default)
- Receber votos dos associados em pautas (os votos são apenas 'Sim'/'Não'. Cada associado é identificado por um id único e pode votar apenas uma vez por pauta)
- Contabilizar os votos e dar o resultado da votação na pauta

Para fins de exercício, a segurança das interfaces pode ser abstraída e qualquer chamada para as interfaces pode ser considerada como autorizada. 

É importante que as pautas e os votos sejam persistidos e que não sejam perdidos com o restart da aplicação.

<b>Funcionalidade extra: Integração com sistemas externos.</b>

- Integrar com um sistema que verifique, a partir do CPF do associado, se ele pode votar
- GET https://user-info.herokuapp.com/users/{cpf}
- Caso o CPF seja inválido, a API retornará o HTTP Status 404 (Not found). Você pode usar geradores de CPF para gerar CPFs válidos
- Caso o CPF seja válido, a API retornará se o usuário pode (ABLE_TO_VOTE) ou não pode (UNABLE_TO_VOTE) executar a operação. Essa operação retorna resultados aleatórios, portanto um mesmo CPF pode funcionar em um teste e não funcionar no outro.

# GIT

Checkout: https://github.com/carlosmaciel/SpringApp

# Requisitos
- Java 8 configurado no JAVA_HOME corretamente.
- Maven versão 3.3.3 instalado.
- Configurar variável de ambiente MAVEN_OPTS para apenas: -Xmx2024m
- Todos os pontos do tópico "Banco de Dados MySQL" abaixo.
- Desenvolvimento feito utilizando Google Chrome como browser padrão.

# Banco de Dados MySQL
- MySQL 8.0 instalado.
- Porta 3306 liberada para mysql.
- Garantir que o serviço MySQL80 esteja funcionando em services.msc.
- Criar uma base chamada "app".
- Executar o database.sql na pasta "db" na raiz do projeto a fim de criar as tabelas.
- Garantir usuario "root" e senha "root" para a aplicação acessar o mysql. 

# Executar
- 1) Realizar o checkout do projeto no link GIT acima.
- 2) Executar os requisitos para o banco de dados listados acima.
- 3) Acessar pasta raiz do projeto executar o comando: mvn spring-boot:run
- 4) Após sucesso, acessar no browser: http://localhost:8080.

# Observações
- Em relação ao cronômetro da sessão, há um cookie criado que permite manter a sessão aberta mesmo que o usuário saia. Portanto, o cronômetro continua a contagem independente da aba/browser.

# Tecnologias utilizadas

- Java 8.
- FrontEnd: JSP, JS (jQuery/Ajax) e CSS3 (bootstrap).
- BackEnd: SpringBoot, REST APIs, Hibernate 5 e logs gerado pelo Log4j.
- Gerenciamento de dependência com Maven 3.3.
- JUnit 4.
- Banco de dados MySQL.
- GIT.

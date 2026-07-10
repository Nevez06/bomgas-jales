# Bom Gás Ultragaz Jales

Site estático da Bom Gás Ultragaz de Jales - SP, preparado para publicação pelo GitHub Pages.

## Estrutura

```text
/
|-- index.html
|-- css/
|   `-- styles.css
|-- js/
|   |-- config.js
|   `-- main.js
|-- assets/
|   |-- images/
|   |   `-- products/
|   `-- icons/
|-- favicon/
|-- robots.txt
|-- sitemap.xml
|-- site.webmanifest
|-- README.md
`-- .gitignore
```

## Dados comerciais

Edite somente o arquivo `js/config.js` para atualizar:

- número do WhatsApp;
- telefone;
- cidade, endereço e horário;
- mensagens dos produtos;
- link do Google Maps;
- link das avaliações no Google.

Os telefones devem conter apenas números, incluindo DDI e DDD. Exemplo:

```js
whatsapp: "5517996129995",
phone: "5517996129995",
```

O botão de avaliações fica desabilitado enquanto `googleReviews` estiver vazio.

## Executar localmente

Na raiz do projeto:

```bash
python -m http.server 8000
```

Abra `http://localhost:8000/`.

## Publicar no GitHub Pages

1. Envie os arquivos para a branch `main` do repositório `bomgas-jales`.
2. Acesse `Settings` > `Pages`.
3. Em `Build and deployment`, escolha `Deploy from a branch`.
4. Selecione `main` e `/(root)`.
5. Salve e aguarde a publicação.

URL padrão:

```text
https://nevez06.github.io/bomgas-jales/
```

## Domínio próprio

1. Configure o domínio em `Settings` > `Pages` > `Custom domain`.
2. Crie um arquivo `CNAME` na raiz contendo apenas o domínio escolhido.
3. Configure o DNS conforme a documentação do GitHub Pages.
4. Troque a canonical, Open Graph, Twitter Card, JSON-LD, `robots.txt` e `sitemap.xml` para o novo domínio.
5. Ative `Enforce HTTPS` após a validação do DNS.

## Observação antes da publicação comercial

O telefone e o WhatsApp estão configurados como `+55 17 99612-9995`. Confirme também o horário, endereço e links do Google antes de divulgar o site.

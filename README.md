# Cobrança Fácil

Protótipo web responsivo/PWA para gestão de clientes e cobranças.

## Executar
`npm install` e `npm run dev`.

## Recursos atuais
- Cadastro, edição e exclusão de clientes e cobranças.
- Busca por nome ou telefone.
- Resumo de valores pendentes, recebidos e atrasados.
- Marcação manual de pagamento, mantendo o cadastro no histórico.
- Dados salvos localmente no navegador.
- Atalho para abrir o WhatsApp com mensagem preenchida.
- Interface adaptável para celular e manifesto PWA.

## Limitações importantes
Esta versão é um protótipo de interface. Ainda não possui autenticação, banco de dados remoto, envio automático, integração com WhatsApp Business Cloud API nem agendador em servidor. O botão do WhatsApp abre uma conversa para envio manual. Para operar como SaaS para várias empresas e enviar lembretes automaticamente, será necessário backend hospedado, banco de dados, autenticação multiempresa, agendador e integração oficial da Meta.
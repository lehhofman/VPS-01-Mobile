# Diário de Viagem

Um aplicativo que permite aos usuários registrar suas experiências de viagem. Os usuários podem criar entradas de viagem que incluem título, descrição, localização, data e imagens, tornando cada recordação única e acessível de qualquer dispositivo.

## Funcionalidades

- **Cadastro e Login de Usuários**: Os usuários podem criar uma conta e fazer login para acessar suas viagens de qualquer dispositivo.
- **Criação de Entradas de Viagem**: Os usuários podem criar entradas com título, descrição, data, localização e uma imagem.
- **Exibição de Entradas**: Usuário tem a possibilidade de visualizar cada entrada individualmente.

## Identidade Visual

O aplicativo é projetado com uma temática de viagem, apresentando uma interface intuitiva e agradável, que melhora a experiência do usuário.

## Tecnologias Usadas

- **Firebase Authentication**: Para gerenciamento de login e cadastro de usuários.
- **Firebase Firestore**: Para armazenamento das entradas (título, descrição, localização, data).
- **Firebase Storage**: Para armazenamento das imagens das entradas.
- **Expo Image Picker**: Para permitir que o usuário selecione uma imagem do dispositivo.
- **React Navigation**: Para navegação entre as telas do app (login, criação de entrada, lista de entradas, etc.).
- **React Native**: Framework para desenvolvimento de aplicativos móveis.
- **Expo**: Plataforma para construção de aplicativos React Native.

## Como Iniciar o Projeto

### Pré-requisitos

- Node.js (versão 14 ou superior)
- Yarn (gerenciador de pacotes)

### Instalação

1. Clone o repositório:

   ```bash
    git https://github.com/lehhofman/VPS-01-Mobile.git
   
   ```
2. Entre na pasta: 
    ```bash
     cd Vigem
   
    ```
3. Baixe as dependencias: 
    ```bash
     yarn add @expo/metro-runtime@~3.2.3 @react-native-community/datetimepicker@^8.2.0 @react-navigation/native@^6.1.18 @react-navigation/stack@^6.4.1 expo@~51.0.28 expo-image-picker@^15.0.7 expo-status-bar@~1.12.1 firebase@^11.0.1 react@18.2.0 react-dom@18.2.0 react-native@0.74.5 react-native-image-picker@^7.1.2 react-native-safe-area-context@^4.14.0 react-native-web@~0.19.10

   
    ```
4. Inicie o App: 
    ```bash
     Yarn start
   
    ```

# Introduction 

EProcurement Frontend

# Getting Started
Para desarrollar y ejecutar la app es necesario tener instalado:

- **VS Code**, descargar desde [aquí](https://code.visualstudio.com/)

- **NVM**

  - Si tenes Node instalado, desinstalarlo.

  - Descargar NVM desde [aquí](https://github.com/coreybutler/nvm-windows/releases)

  - Instalar Node 10.15.1

    ```
    nvm install 10.15.1
    ```

- **Angular**: (More info [README-ANGULAR.md](README-ANGULAR.md))

  ```
  npm install -g @angular/cli@7.2.4
  ```

# ¿How to Contribute?

Leer [CONTRIBUTE.md](CONTRIBUTE.md).

# Branching Model

Leer [BRANCH-MODEL.md](BRANCH-MODEL.md).

# Build
**TO DEFINE**

# Environments

**TO DEFINE**...

Se crearon los siguientes ambientes:

- **[DEV](http://dev.eprocurement.originsw.com)**: refleja hasta el último commit en el branch de `development` (en este caso **master**).
- **[QA](http://qa.eprocurement.originsw.com)**: refleja hasta el último commit en el branch de `release` que se encuentre creado.
- **[PREPROD](http://preprod.eprocurement.originsw.com)**: refleja hasta el último commit en el branch de `hotfix` que se encuentre creado.
- **[PROD](http://www.eprocurement.originsw.com)**: refleja hasta el último commit en el branch de `production` (en este caso **prod**).

**Todos los ambientes tienen CI/CD (continuous integration y continuous deployment).** 

La configuración de dichos ambientes puede ser accedida solamente por aquel que tenga el rol de administrarlos y **NO se debería realizar ningún deployment manual**.

# Deployments

Leer [DEPLOYMENTS CI/CD in Wiki](https://teams.microsoft.com/l/entity/com.microsoft.teamspace.tab.wiki/tab::d913b158-a6ae-42e8-9c39-37c73b4cb21f?context=%7B%22subEntityId%22%3A%22%7B%5C%22pageId%5C%22%3A13%2C%5C%22origin%5C%22%3A2%7D%22%2C%22channelId%22%3A%2219%3A2c65e4e914b34443b58ba2a101cb2585%40thread.skype%22%7D&tenantId=d5873149-75b7-4cee-b82f-1fab07043a21)
# MyChat App

This is the backend for the chat project.

## Scripts

We enforce the usage of Yarn to install dependencies and run scripts. Using NPM will result in an intentional error.

### yarn dev

Starts the server

### Auth

We use Clerk to handle authentication. You can find the docs [here](https://docs.clerk.dev/overview/introduction). We rely on webhooks to sync the user data with the database. To be able to use webhooks, you need to expose the application to the internet. We recommend using [ngrok](https://ngrok.com/) to do so. Check out the [docs](https://clerk.com/docs/webhooks/sync-data) for more information.

To expose the application, simply run `ngrok http --url=lucky-prompt-wallaby.ngrok-free.app 80`. Where `lucky-prompt-wallaby` is the name of your ngrok domain.

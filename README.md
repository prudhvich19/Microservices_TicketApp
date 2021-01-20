# Microservices_TicketApp
This a ticket booking app where users can signup/signin using JWT, purchase and sell tickets. This app is made with a great focus on the back-end using
the Microservices architecture and is deployable and scalabe using kubernetes and docker. It mainly consists of 6 services that handle authentication, ticketing, orders,
payments, expiration (of orders) and a server-side rendered React app using NextJs. Ingress-Ngnix is used for load balancing and routing to services inside Kubernetes.
This project can handle concurrency issues as it implements the optmistic concurrency control approach.

All the services are made up of Express and communicate asynchronously by emitting events to the NATS streaming server Event-Bus in order to exchange data 
amongst themselves. The expriration service uses Redis and BullJs to keep of track of the time limit for each of the orders (no endpoints present), whereas all
the others use MongoDb (and do have endpoints). The payments service can handle payments using a token and a charge in real time in StripeJS.
All the service share all common functionality such as event publishers and listeners, error-handling, authentication middleware using a custom-made npm library.

I also made use of minikube and skaffold while developing it locally.


This project has only been made to show the best of my skills for my job-seeking purposes.


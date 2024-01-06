# Tamper Proof Data

At Bequest, we require that important user data is tamper proof. Otherwise, our system can incorrectly distribute assets if our internal database is breached. 
Only the user is able to update their own data.


**1. How does the client insure that their data has not been tampered with? Assume that the database is compromised.**
A trustable copy of the data is always maintained/updated along with the encrypted value of the data which is separate from the database ( it can be stored somewhere in cloud or private data centre). To check whether the data is compromised or not we can check with the data on our private storage and We can compare the value of sent data  with both  our stored value and encrypted value to ensure the integrity of the data ' 
<br />
**2. If the data has been tampered with, how can the client recover the lost data?**
The data from our private or trusted storage can send to the user back.


Edit this repo to answer these two questions using any technologies you'd like, there any many possible solutions. Feel free to add comments.

### To run the apps:
```npm run start``` in both the frontend and backend

## To make a submission:
1. Clone the repo
2. Make a PR with your changes in your repo
3. Email your github repository to robert@bequest.finance

##Results 

Tampered
![alt text](./client/public/tampered.png?raw=true)

Verified
![alt text](./client/public/verified.png?raw=true)

Recovered
![alt text](./client/public/recovered.png?raw=true)

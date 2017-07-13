FROM node:6.9.4

#Maintainer
MAINTAINER HAR PREET SINGH singh.1@campus.tu-berlin.de 

# install cordova >=4.2.0 for ionic framework 2
RUN npm install -g cordova@4.2.0

# install ionic 2 framework
RUN npm install -g ionic@2.2.1

# setting up the the Home Envoirment
ENV HOME=/src

#Create a Home Directory
RUN mkdir $HOME

#Add Source from the local folder to the Home Directory
ADD src /$HOME

#Switch the Path
RUN cd $HOME/Pandamic

#Defining Working Directory
WORKDIR $HOME/Pandamic

#Install the Dependencies
RUN npm install

#Port Number Config 
EXPOSE 8100
EXPOSE 35729

#Serve the IONIC Project on Browser
CMD ionic serve
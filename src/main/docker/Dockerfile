FROM openjdk:12

ADD family-budget-website.jar /usr/local/family-budget-website/

VOLUME /var/log/onlyone-portal

WORKDIR /usr/local/family-budget-website/

CMD ["java", "-Xms512m", "-Xmx1g", "-jar", "family-budget-website.jar"]
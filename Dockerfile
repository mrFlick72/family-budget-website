FROM openjdk:17

ADD target/family-budget-website.jar /usr/local/family-budget-website/

VOLUME /var/log/onlyone-portal

WORKDIR /usr/local/family-budget-website/

CMD ["java", "-jar", "family-budget-website.jar"]
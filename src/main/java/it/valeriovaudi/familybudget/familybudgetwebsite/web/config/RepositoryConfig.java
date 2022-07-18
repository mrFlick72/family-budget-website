package it.valeriovaudi.familybudget.familybudgetwebsite.web.config;


import it.valeriovaudi.familybudget.familybudgetwebsite.adapters.repository.I18nMessagesCacheRefresher;
import it.valeriovaudi.familybudget.familybudgetwebsite.adapters.repository.ReceiveMessageRequestFactory;
import it.valeriovaudi.familybudget.familybudgetwebsite.adapters.repository.RestMessageRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.CacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;
import reactor.core.publisher.Flux;
import software.amazon.awssdk.auth.credentials.AwsCredentialsProvider;
import software.amazon.awssdk.auth.credentials.EnvironmentVariableCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.sqs.SqsAsyncClient;

import java.time.Duration;

@Configuration
public class RepositoryConfig {

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

    @Bean
    public RestMessageRepository messageRepository(
            @Value("${i18n-messages.base-url:http://i18n-messages}") String i18nBaseUrl,
            @Value("${spring.application.name}") String applicationId,
            RestTemplate restTemplate) {
        return new RestMessageRepository(i18nBaseUrl, applicationId, restTemplate);
    }

    @Bean
    public ReceiveMessageRequestFactory receiveMessageRequestFactory(@Value("${i18n-messages.cache.updater.listener.queueUrl}") String queueUrl,
                                                                     @Value("${i18n-messages.cache.updater.listener.maxNumberOfMessages}") Integer maxNumberOfMessages,
                                                                     @Value("${i18n-messages.cache.updater.listener.visibilityTimeout}") Integer visibilityTimeout,
                                                                     @Value("${i18n-messages.cache.updater.listener.waitTimeSeconds}") Integer waitTimeSeconds

    ) {
        return new ReceiveMessageRequestFactory(queueUrl, maxNumberOfMessages, visibilityTimeout, waitTimeSeconds);
    }

    @Bean
    public I18nMessagesCacheRefresher reactiveCacheUpdaterListener(@Value("${i18n-messages.cache.updater.listener.sleeping:10m}") Duration sleeping,
                                                                   CacheManager cacheManager,
                                                                   ReceiveMessageRequestFactory receiveMessageRequestFactory,
                                                                   SqsAsyncClient sqsAsyncClient) {
        return new I18nMessagesCacheRefresher(cacheManager, sleeping, Flux.just(1).repeat(), receiveMessageRequestFactory, sqsAsyncClient);
    }

    @Bean
    public AwsCredentialsProvider awsCredentialsProvider() {
        return EnvironmentVariableCredentialsProvider.create();
    }


    @Bean
    public SqsAsyncClient sqsAsyncClient(@Value("${aws.region}") String awsRegion,
                                         AwsCredentialsProvider awsCredentialsProvider) {
        return SqsAsyncClient.builder()
                .credentialsProvider(awsCredentialsProvider)
                .region(Region.of(awsRegion))
                .build();
    }
}

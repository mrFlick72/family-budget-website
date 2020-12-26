package it.valeriovaudi.familybudget.familybudgetwebsite.adapters.repository;

import org.springframework.cache.CacheManager;
import reactor.core.publisher.Mono;

import java.util.HashMap;
import java.util.Objects;

@Deprecated
public class I18nMessagesCacheRefresher {

    private final CacheManager cacheManager;

    public I18nMessagesCacheRefresher(CacheManager cacheManager) {
        this.cacheManager = cacheManager;
    }

    public Mono<Void> refresh(HashMap<String, String> bundle) {
        return Mono.fromCallable(() -> Objects.requireNonNull(cacheManager.getCache("family-budget-website.i18n.messages")).invalidate())
                .map(tick -> Mono.fromCallable(() -> cacheManager.getCache("family-budget-website.i18n.messages").putIfAbsent("i18n.messages", bundle)))
                .then();
    }
}

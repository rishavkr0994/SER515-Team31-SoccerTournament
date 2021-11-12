package com.ser515.soccer;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
public class ImageHostingServiceInterface {
    private static final String API_URL = "api.imgbb.com/1/upload";

    @Value("${soccer.image-hosting.api-key}")
    private String apiKey;

    private final RestTemplate restTemplate;
    private final ObjectMapper jsonObjectMapper = new ObjectMapper();

    public ImageHostingServiceInterface(RestTemplateBuilder restTemplateBuilder) {
        this.restTemplate = restTemplateBuilder.build();
    }

    public String uploadImage(String imgBase64) throws JsonProcessingException, NullPointerException {
        String requestURL = String.format("https://%s?key=%s", API_URL, apiKey);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("image", imgBase64);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, headers);
        ResponseEntity<String> response = restTemplate.postForEntity(requestURL, request , String.class);
        if (response.getStatusCode() == HttpStatus.OK) {
            JsonNode responseObj = jsonObjectMapper.readTree(response.getBody());
            return responseObj.get("data").get("medium").get("url").asText();
        } else return null;
    }
}

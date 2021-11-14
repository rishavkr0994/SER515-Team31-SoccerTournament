package com.ser515.soccer;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;

import java.io.IOException;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

public class CustomTimestampDeserializer extends StdDeserializer<ZonedDateTime> {
    private static final DateTimeFormatter format = DateTimeFormatter.ofPattern("E MMM d yyyy HH:mm:ss 'GMT'Z (zzzz)");

    public CustomTimestampDeserializer() { this(ZonedDateTime.class); }
    public CustomTimestampDeserializer(Class<ZonedDateTime> c) { super(c); }

    @Override
    public ZonedDateTime deserialize(JsonParser jsonParser, DeserializationContext deserializationContext)
            throws IOException, JsonProcessingException {
        String timestamp = jsonParser.getText();
        try {
            return ZonedDateTime.parse(timestamp, format);
        } catch (DateTimeParseException e) {
            throw new RuntimeException(e);
        }
    }
}

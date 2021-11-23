package com.ser515.soccer;

import com.ser515.soccer.database.datamodel.SoccerMatch;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class TicketMailingService {
    private static final String SUBJECT_LINE_PREFIX = "[ASU Soccer] Ticket Booking Confirmed !";

    private final JavaMailSender javaMailSender;
    public TicketMailingService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    @Async
    public void sendEmail(String recipientEmail, SoccerMatch soccerMatch) {
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(recipientEmail);
        msg.setSubject(SUBJECT_LINE_PREFIX);

        String text = "You ticket booking has been confirmed.\n\nMatch details:\n";
        text += String.format("%s Vs. %s\n", soccerMatch.getTeam1Name(), soccerMatch.getTeam2Name());
        text += String.format("Date : %s\n", soccerMatch.getTime());
        text += String.format("Venue: %s\n", soccerMatch.getFieldName());
        text += "\nPlease show this email at the venue as a proof of purchase";
        msg.setText(text);

        javaMailSender.send(msg);
    }
}

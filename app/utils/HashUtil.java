package utils;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class HashUtil {

    public static String hashString(String stringValue) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] binDigest = digest.digest(stringValue.getBytes());
            return bytesToHex(binDigest);
        } catch (NoSuchAlgorithmException e) {
            return stringValue;
        }
    }

    private static String bytesToHex(byte[] hash) {
        StringBuffer hexString = new StringBuffer();
        for (int i = 0; i < hash.length; i++) {
            String hex = Integer.toHexString(0xff & hash[i]);
            if (hex.length() == 1) hexString.append('0');
            hexString.append(hex);
        }
        return hexString.toString();
    }
}

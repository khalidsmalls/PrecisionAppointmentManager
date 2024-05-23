package com.smalls.precision.utils;

import lombok.Data;
import org.springframework.stereotype.Component;

import java.security.KeyPair;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;

@Component
@Data
public class RSAKeyProperties {

    private RSAPublicKey publicKey;

    private RSAPrivateKey privateKey;

    public RSAKeyProperties() {
        KeyPair keyPair = KeyGeneratorUtility.generateRSAKey();
        publicKey = (RSAPublicKey) keyPair.getPublic();
        privateKey = (RSAPrivateKey) keyPair.getPrivate();
    }
}

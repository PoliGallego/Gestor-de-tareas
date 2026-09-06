package rmi.shared;

import java.rmi.Remote;
import java.rmi.RemoteException;
import java.util.Map;

public interface AuthRmiPort extends Remote {

        Map<String, String> auth(RmiLoginRequest request) throws RemoteException;

        String extractSubject(String token) throws RemoteException;

        String generateRefreshToken(String userId) throws RemoteException;

        boolean isAccessTokenValid(String token) throws RemoteException;

        boolean isRefreshTokenValid(String token) throws RemoteException;
}

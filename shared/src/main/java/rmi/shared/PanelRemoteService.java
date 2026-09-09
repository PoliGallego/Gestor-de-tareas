package rmi.shared;

import java.rmi.Remote;
import java.rmi.RemoteException;
import java.util.List;

public interface PanelRemoteService extends Remote {
    String PING = "PANEL_SERVICE";

    RmiPanelData crearPanel(RmiPanelData panel) throws RemoteException;

    List<RmiPanelData> listarPaneles(String propietarioId) throws RemoteException;
}

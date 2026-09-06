package rmi.shared;

import java.rmi.Remote;
import java.rmi.RemoteException;
import java.util.List;

public interface PanelRemoteService extends Remote {
    String PING = "PANEL_SERVICE";

    Panel crearPanel(Panel panel) throws RemoteException;

    List<Panel> listarPaneles(String propietarioId) throws RemoteException;

    Panel actualizarEstado(String panelId, EstadoPanel nuevoEstado) throws RemoteException;
}

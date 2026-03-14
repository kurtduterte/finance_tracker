import NetInfo, { type NetInfoState } from '@react-native-community/netinfo'

export type NetworkStatus = {
  isConnected: boolean
  isInternetReachable: boolean | null
}

export function getNetworkStatus(): Promise<NetworkStatus> {
  return NetInfo.fetch().then((state) => ({
    isConnected: state.isConnected ?? false,
    isInternetReachable: state.isInternetReachable,
  }))
}

export function subscribeToNetwork(
  callback: (status: NetworkStatus) => void
): () => void {
  return NetInfo.addEventListener((state: NetInfoState) => {
    callback({
      isConnected: state.isConnected ?? false,
      isInternetReachable: state.isInternetReachable,
    })
  })
}

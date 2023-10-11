import Foundation
import Capacitor

@objc public class CapacitorKhenshin: NSObject {


    public func readFile(at fileUrl: URL, with encoding: String?) throws -> String {
        fileUrl.startAccessingSecurityScopedResource()
        if encoding != nil {
            let data = try String(contentsOf: fileUrl, encoding: .utf8)
            fileUrl.stopAccessingSecurityScopedResource()
            return data
        } else {
            let data = try Data(contentsOf: fileUrl)
            fileUrl.stopAccessingSecurityScopedResource()
            return data.base64EncodedString()
        }
    }

}

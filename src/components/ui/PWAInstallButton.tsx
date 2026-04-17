import { useState } from "react";
import { Download, Smartphone } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePWAInstall } from "@/hooks/usePWAInstall";

export default function PWAInstallButton() {
  const { t } = useTranslation();
  const { canInstall, isInstalled, promptInstall, isIOSSafari } = usePWAInstall();
  const [open, setOpen] = useState(false);

  if (isInstalled) return null;

  const handleClick = async () => {
    if (canInstall) {
      await promptInstall();
    } else {
      setOpen(true);
    }
  };

  return (
    <>
      <Button onClick={handleClick} variant="outline" size="sm" className="gap-2">
        <Download className="w-4 h-4" />
        <span className="hidden sm:inline">{t("pwa.install")}</span>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-primary" />
              {t("pwa.installPrompt")}
            </DialogTitle>
            <DialogDescription>{t("pwa.installDescription")}</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 text-sm">
            {isIOSSafari ? (
              <div className="space-y-2">
                <p className="font-medium">iOS / Safari:</p>
                <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                  <li>Trokit butonin Share në Safari</li>
                  <li>Zgjidh "Add to Home Screen"</li>
                  <li>Konfirmo me "Add"</li>
                </ol>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="font-medium">Android / Chrome / Edge:</p>
                <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                  <li>Hap menynë e shfletuesit (⋮)</li>
                  <li>Zgjidh "Install app" ose "Add to Home Screen"</li>
                </ol>
                <p className="font-medium pt-2">Desktop (Chrome / Edge):</p>
                <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                  <li>Klik ikonën Install në shiritin e adresës</li>
                </ol>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

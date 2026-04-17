import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import * as OTPAuth from "otpauth";
import QRCode from "qrcode";
import { ShieldCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const STORAGE_KEY = "elif_2fa_secret";

export default function TwoFactorSetup() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [secret, setSecret] = useState<string>("");
  const [code, setCode] = useState("");
  const [enabled, setEnabled] = useState(false);
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    const init = async () => {
      // Use getUser() — getClaims() does not exist on supabase-js v2
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setEmail(user.email ?? "user");

      const existing = localStorage.getItem(`${STORAGE_KEY}_${user.id}`);
      if (existing) {
        setEnabled(true);
        setSecret(existing);
        return;
      }

      const newSecret = new OTPAuth.Secret({ size: 20 }).base32;
      setSecret(newSecret);

      const totp = new OTPAuth.TOTP({
        issuer: "Elif",
        label: user.email ?? "user",
        algorithm: "SHA1",
        digits: 6,
        period: 30,
        secret: OTPAuth.Secret.fromBase32(newSecret),
      });

      const url = await QRCode.toDataURL(totp.toString(), { width: 220, margin: 1 });
      setQrDataUrl(url);
    };
    init();
  }, []);

  const verify = async () => {
    const totp = new OTPAuth.TOTP({
      issuer: "Elif",
      label: email,
      algorithm: "SHA1",
      digits: 6,
      period: 30,
      secret: OTPAuth.Secret.fromBase32(secret),
    });
    const delta = totp.validate({ token: code, window: 1 });
    if (delta === null) {
      toast({ title: "Kod i pavlefshëm", variant: "destructive" });
      return;
    }
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    localStorage.setItem(`${STORAGE_KEY}_${user.id}`, secret);
    setEnabled(true);
    toast({ title: "2FA u aktivizua me sukses ✅" });
  };

  const disable = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    localStorage.removeItem(`${STORAGE_KEY}_${user.id}`);
    setEnabled(false);
    setCode("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-primary" />
          {t("auth.twoFactor")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {enabled ? (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">2FA është aktiv për këtë llogari.</p>
            <Button variant="destructive" onClick={disable}>
              {t("auth.disable2FA")}
            </Button>
          </div>
        ) : (
          <>
            {qrDataUrl && (
              <div className="flex flex-col items-center gap-3">
                <p className="text-sm text-muted-foreground">{t("auth.scanQr")}</p>
                <img src={qrDataUrl} alt="2FA QR Code" className="rounded-lg border" />
                <p className="text-xs text-muted-foreground break-all max-w-xs text-center">
                  Kodi manual: <code className="font-mono">{secret}</code>
                </p>
              </div>
            )}
            <div className="space-y-2">
              <Input
                placeholder={t("auth.twoFactorCode")}
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                maxLength={6}
                inputMode="numeric"
              />
              <Button onClick={verify} className="w-full" disabled={code.length !== 6}>
                {t("auth.verify")}
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

import PwaInstallPromptWrapper from '@/components/pwa/PwaInstallPromptWrapper';
import Lto from '@/components/shared/Lto';

export default function Home() {
  const showPromptes: boolean = false;
  return (
    <div>
      {/* PWA Install Prompt */}
      {showPromptes && (
        <PwaInstallPromptWrapper appName="PWA App" appIcon="/icons/apple-touch-icon.png" />
      )}
      <div>
        <Lto />
      </div>
    </div>
  );
}

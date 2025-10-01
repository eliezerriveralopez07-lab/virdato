import PhBoot from './ph-boot'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <PhBoot />
        {children}
      </body>
    </html>
  )
}





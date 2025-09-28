import EventifyHeader from "@/components/layout/navbar";

interface WithNavLayoutProps {
    children: React.ReactNode;
}

export default function LayoutWithNav({children}: WithNavLayoutProps) {
    return(
        <>
            <EventifyHeader/>
            {children}
        </>
    );
}
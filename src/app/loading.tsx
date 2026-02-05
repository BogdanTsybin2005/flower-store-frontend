import { Container } from "@/shared/ui/Container";
import { Card } from "@/shared/ui/Card";
import { Loader } from "@/shared/ui/Loader";

export default function LoadingPage() {
  return (
    <Container className="stack">
      <Card
        className="stack"
        style={{ textAlign: "center", padding: "3rem 1rem" }}
      >
        <h2>Loading...</h2>
        <Loader />
      </Card>
    </Container>
  );
}

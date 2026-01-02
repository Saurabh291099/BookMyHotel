import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle, ArrowRight } from "lucide-react";

export default function OnboardingSuccess() {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white flex items-center justify-center px-4 py-12">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>

          <h1 className="text-3xl font-bold text-foreground mb-4">
            You're All Set!
          </h1>

          <p className="text-lg text-muted-foreground mb-8">
            Your hotel profile has been created successfully. Your website will be
            live in a few moments.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <p className="text-sm text-blue-900">
              <span className="font-semibold">Your hotel website:</span>
              <br />
              <span className="font-mono text-blue-700">myhotel.hotelhub.com</span>
            </p>
          </div>

          <div className="space-y-3">
            <Link to="/dashboard" className="block">
              <Button className="w-full" size="lg">
                Go to Dashboard
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <a href="#" className="block">
              <Button variant="outline" className="w-full" size="lg">
                View Your Website
              </Button>
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}

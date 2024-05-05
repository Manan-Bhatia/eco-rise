import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/helpers/dbConfig";
connect();
import User from "@/models/userModel";

export async function GET(request: NextRequest) {}

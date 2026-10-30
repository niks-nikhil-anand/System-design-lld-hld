-- CreateEnum
CREATE TYPE "ContentKind" AS ENUM ('CONCEPT', 'ALGORITHM', 'CASE_STUDY', 'COMPANY', 'LEARNING_PATH', 'BLOG_POST', 'PLAYGROUND_TEMPLATE');

-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED');

-- CreateEnum
CREATE TYPE "PublishStatus" AS ENUM ('DRAFT', 'REVIEW', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "ContentLinkType" AS ENUM ('RELATED', 'PREREQUISITE', 'COMPANY_REFERENCE', 'FURTHER_READING');

-- CreateEnum
CREATE TYPE "TradeoffSide" AS ENUM ('PRO', 'CON');

-- CreateEnum
CREATE TYPE "RequirementType" AS ENUM ('FUNCTIONAL', 'NON_FUNCTIONAL');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'EDITOR', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "name" TEXT,
    "image" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refreshToken" TEXT,
    "accessToken" TEXT,
    "expiresAt" INTEGER,
    "tokenType" TEXT,
    "scope" TEXT,
    "idToken" TEXT,
    "sessionState" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "kind" "ContentKind" NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Content" (
    "id" TEXT NOT NULL,
    "kind" "ContentKind" NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "status" "PublishStatus" NOT NULL DEFAULT 'DRAFT',
    "difficulty" "Difficulty",
    "readingMinutes" INTEGER,
    "categoryId" TEXT,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContentTag" (
    "contentId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "ContentTag_pkey" PRIMARY KEY ("contentId","tagId")
);

-- CreateTable
CREATE TABLE "ContentLink" (
    "sourceId" TEXT NOT NULL,
    "targetId" TEXT NOT NULL,
    "type" "ContentLinkType" NOT NULL DEFAULT 'RELATED',
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ContentLink_pkey" PRIMARY KEY ("sourceId","targetId","type")
);

-- CreateTable
CREATE TABLE "Concept" (
    "contentId" TEXT NOT NULL,
    "definition" TEXT,
    "whatItIs" TEXT,
    "whyItMatters" TEXT,

    CONSTRAINT "Concept_pkey" PRIMARY KEY ("contentId")
);

-- CreateTable
CREATE TABLE "ConceptStep" (
    "id" TEXT NOT NULL,
    "conceptId" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL,
    "body" TEXT NOT NULL,

    CONSTRAINT "ConceptStep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConceptVariant" (
    "id" TEXT NOT NULL,
    "conceptId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ConceptVariant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConceptTradeoff" (
    "id" TEXT NOT NULL,
    "conceptId" TEXT NOT NULL,
    "side" "TradeoffSide" NOT NULL,
    "body" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ConceptTradeoff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Algorithm" (
    "contentId" TEXT NOT NULL,
    "timeComplexity" TEXT NOT NULL,
    "spaceComplexity" TEXT NOT NULL,
    "visualization" INTEGER[],

    CONSTRAINT "Algorithm_pkey" PRIMARY KEY ("contentId")
);

-- CreateTable
CREATE TABLE "CaseStudy" (
    "contentId" TEXT NOT NULL,
    "problem" TEXT,
    "assumptions" TEXT,
    "architectureTitle" TEXT,

    CONSTRAINT "CaseStudy_pkey" PRIMARY KEY ("contentId")
);

-- CreateTable
CREATE TABLE "CaseObjective" (
    "id" TEXT NOT NULL,
    "caseId" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL,

    CONSTRAINT "CaseObjective_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CaseRequirement" (
    "id" TEXT NOT NULL,
    "caseId" TEXT NOT NULL,
    "type" "RequirementType" NOT NULL,
    "body" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL,

    CONSTRAINT "CaseRequirement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CapacityEstimate" (
    "id" TEXT NOT NULL,
    "caseId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "rationale" TEXT,
    "sortOrder" INTEGER NOT NULL,

    CONSTRAINT "CapacityEstimate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApiEndpoint" (
    "id" TEXT NOT NULL,
    "caseId" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL,

    CONSTRAINT "ApiEndpoint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeepDive" (
    "id" TEXT NOT NULL,
    "caseId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL,

    CONSTRAINT "DeepDive_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CaseTradeoff" (
    "id" TEXT NOT NULL,
    "caseId" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "decision" TEXT NOT NULL,
    "rationale" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL,

    CONSTRAINT "CaseTradeoff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "contentId" TEXT NOT NULL,
    "overview" TEXT,
    "architectureTitle" TEXT,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("contentId")
);

-- CreateTable
CREATE TABLE "CompanyProduct" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "problem" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL,

    CONSTRAINT "CompanyProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyMetric" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL,

    CONSTRAINT "CompanyMetric_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyTakeaway" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL,

    CONSTRAINT "CompanyTakeaway_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LearningPath" (
    "contentId" TEXT NOT NULL,
    "durationMinutes" INTEGER,

    CONSTRAINT "LearningPath_pkey" PRIMARY KEY ("contentId")
);

-- CreateTable
CREATE TABLE "PathModule" (
    "id" TEXT NOT NULL,
    "pathId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL,

    CONSTRAINT "PathModule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PathModuleItem" (
    "moduleId" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL,

    CONSTRAINT "PathModuleItem_pkey" PRIMARY KEY ("moduleId","contentId")
);

-- CreateTable
CREATE TABLE "BlogPost" (
    "contentId" TEXT NOT NULL,
    "intro" TEXT NOT NULL,
    "authorId" TEXT,

    CONSTRAINT "BlogPost_pkey" PRIMARY KEY ("contentId")
);

-- CreateTable
CREATE TABLE "BlogSection" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "anchor" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "code" TEXT,
    "takeaway" TEXT,
    "sortOrder" INTEGER NOT NULL,

    CONSTRAINT "BlogSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlaygroundTemplate" (
    "contentId" TEXT NOT NULL,
    "p99Latency" TEXT,
    "throughput" TEXT,
    "bottleneck" TEXT,

    CONSTRAINT "PlaygroundTemplate_pkey" PRIMARY KEY ("contentId")
);

-- CreateTable
CREATE TABLE "ArchitectureDiagram" (
    "id" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,
    "title" TEXT,

    CONSTRAINT "ArchitectureDiagram_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiagramNode" (
    "id" TEXT NOT NULL,
    "diagramId" TEXT NOT NULL,
    "externalKey" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT,
    "x" DOUBLE PRECISION NOT NULL,
    "y" DOUBLE PRECISION NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "DiagramNode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiagramEdge" (
    "id" TEXT NOT NULL,
    "diagramId" TEXT NOT NULL,
    "sourceNodeKey" TEXT NOT NULL,
    "targetNodeKey" TEXT NOT NULL,
    "label" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "DiagramEdge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bookmark" (
    "userId" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Bookmark_pkey" PRIMARY KEY ("userId","contentId")
);

-- CreateTable
CREATE TABLE "ContentProgress" (
    "userId" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "percent" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContentProgress_pkey" PRIMARY KEY ("userId","contentId")
);

-- CreateTable
CREATE TABLE "ContentRevision" (
    "id" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,
    "authorId" TEXT,
    "version" INTEGER NOT NULL,
    "status" "PublishStatus" NOT NULL DEFAULT 'DRAFT',
    "snapshot" JSONB NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContentRevision_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Account_userId_idx" ON "Account"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE INDEX "Session_userId_idx" ON "Session"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "Category_kind_name_key" ON "Category"("kind", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_slug_key" ON "Tag"("slug");

-- CreateIndex
CREATE INDEX "Content_kind_status_publishedAt_idx" ON "Content"("kind", "status", "publishedAt");

-- CreateIndex
CREATE INDEX "Content_categoryId_idx" ON "Content"("categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "Content_kind_slug_key" ON "Content"("kind", "slug");

-- CreateIndex
CREATE INDEX "ContentTag_tagId_idx" ON "ContentTag"("tagId");

-- CreateIndex
CREATE INDEX "ContentLink_targetId_type_idx" ON "ContentLink"("targetId", "type");

-- CreateIndex
CREATE UNIQUE INDEX "ConceptStep_conceptId_sortOrder_key" ON "ConceptStep"("conceptId", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "ConceptVariant_conceptId_key_key" ON "ConceptVariant"("conceptId", "key");

-- CreateIndex
CREATE UNIQUE INDEX "ConceptVariant_conceptId_sortOrder_key" ON "ConceptVariant"("conceptId", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "ConceptTradeoff_conceptId_side_sortOrder_key" ON "ConceptTradeoff"("conceptId", "side", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "CaseObjective_caseId_sortOrder_key" ON "CaseObjective"("caseId", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "CaseRequirement_caseId_type_sortOrder_key" ON "CaseRequirement"("caseId", "type", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "CapacityEstimate_caseId_sortOrder_key" ON "CapacityEstimate"("caseId", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "ApiEndpoint_caseId_sortOrder_key" ON "ApiEndpoint"("caseId", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "DeepDive_caseId_sortOrder_key" ON "DeepDive"("caseId", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "CaseTradeoff_caseId_sortOrder_key" ON "CaseTradeoff"("caseId", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyProduct_companyId_sortOrder_key" ON "CompanyProduct"("companyId", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyMetric_companyId_sortOrder_key" ON "CompanyMetric"("companyId", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyTakeaway_companyId_sortOrder_key" ON "CompanyTakeaway"("companyId", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "PathModule_pathId_sortOrder_key" ON "PathModule"("pathId", "sortOrder");

-- CreateIndex
CREATE INDEX "PathModuleItem_contentId_idx" ON "PathModuleItem"("contentId");

-- CreateIndex
CREATE UNIQUE INDEX "PathModuleItem_moduleId_sortOrder_key" ON "PathModuleItem"("moduleId", "sortOrder");

-- CreateIndex
CREATE INDEX "BlogPost_authorId_idx" ON "BlogPost"("authorId");

-- CreateIndex
CREATE UNIQUE INDEX "BlogSection_postId_anchor_key" ON "BlogSection"("postId", "anchor");

-- CreateIndex
CREATE UNIQUE INDEX "BlogSection_postId_sortOrder_key" ON "BlogSection"("postId", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "ArchitectureDiagram_contentId_key" ON "ArchitectureDiagram"("contentId");

-- CreateIndex
CREATE UNIQUE INDEX "DiagramNode_diagramId_externalKey_key" ON "DiagramNode"("diagramId", "externalKey");

-- CreateIndex
CREATE INDEX "DiagramEdge_diagramId_idx" ON "DiagramEdge"("diagramId");

-- CreateIndex
CREATE INDEX "Bookmark_contentId_idx" ON "Bookmark"("contentId");

-- CreateIndex
CREATE INDEX "ContentProgress_userId_updatedAt_idx" ON "ContentProgress"("userId", "updatedAt");

-- CreateIndex
CREATE INDEX "ContentRevision_contentId_status_createdAt_idx" ON "ContentRevision"("contentId", "status", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "ContentRevision_contentId_version_key" ON "ContentRevision"("contentId", "version");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContentTag" ADD CONSTRAINT "ContentTag_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContentTag" ADD CONSTRAINT "ContentTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContentLink" ADD CONSTRAINT "ContentLink_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContentLink" ADD CONSTRAINT "ContentLink_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "Content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Concept" ADD CONSTRAINT "Concept_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConceptStep" ADD CONSTRAINT "ConceptStep_conceptId_fkey" FOREIGN KEY ("conceptId") REFERENCES "Concept"("contentId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConceptVariant" ADD CONSTRAINT "ConceptVariant_conceptId_fkey" FOREIGN KEY ("conceptId") REFERENCES "Concept"("contentId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConceptTradeoff" ADD CONSTRAINT "ConceptTradeoff_conceptId_fkey" FOREIGN KEY ("conceptId") REFERENCES "Concept"("contentId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Algorithm" ADD CONSTRAINT "Algorithm_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseStudy" ADD CONSTRAINT "CaseStudy_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseObjective" ADD CONSTRAINT "CaseObjective_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "CaseStudy"("contentId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseRequirement" ADD CONSTRAINT "CaseRequirement_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "CaseStudy"("contentId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CapacityEstimate" ADD CONSTRAINT "CapacityEstimate_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "CaseStudy"("contentId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApiEndpoint" ADD CONSTRAINT "ApiEndpoint_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "CaseStudy"("contentId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeepDive" ADD CONSTRAINT "DeepDive_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "CaseStudy"("contentId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseTradeoff" ADD CONSTRAINT "CaseTradeoff_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "CaseStudy"("contentId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyProduct" ADD CONSTRAINT "CompanyProduct_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("contentId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyMetric" ADD CONSTRAINT "CompanyMetric_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("contentId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyTakeaway" ADD CONSTRAINT "CompanyTakeaway_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("contentId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LearningPath" ADD CONSTRAINT "LearningPath_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PathModule" ADD CONSTRAINT "PathModule_pathId_fkey" FOREIGN KEY ("pathId") REFERENCES "LearningPath"("contentId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PathModuleItem" ADD CONSTRAINT "PathModuleItem_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "PathModule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PathModuleItem" ADD CONSTRAINT "PathModuleItem_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogPost" ADD CONSTRAINT "BlogPost_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogPost" ADD CONSTRAINT "BlogPost_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogSection" ADD CONSTRAINT "BlogSection_postId_fkey" FOREIGN KEY ("postId") REFERENCES "BlogPost"("contentId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlaygroundTemplate" ADD CONSTRAINT "PlaygroundTemplate_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArchitectureDiagram" ADD CONSTRAINT "ArchitectureDiagram_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiagramNode" ADD CONSTRAINT "DiagramNode_diagramId_fkey" FOREIGN KEY ("diagramId") REFERENCES "ArchitectureDiagram"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiagramEdge" ADD CONSTRAINT "DiagramEdge_diagramId_fkey" FOREIGN KEY ("diagramId") REFERENCES "ArchitectureDiagram"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContentProgress" ADD CONSTRAINT "ContentProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContentProgress" ADD CONSTRAINT "ContentProgress_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContentRevision" ADD CONSTRAINT "ContentRevision_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContentRevision" ADD CONSTRAINT "ContentRevision_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
